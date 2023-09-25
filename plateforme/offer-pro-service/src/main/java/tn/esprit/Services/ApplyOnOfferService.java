package tn.esprit.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import tn.esprit.Dtos.MsgReponseStatusDto;
import tn.esprit.Dtos.ReponseStatus;
import tn.esprit.Entitys.ApplyOnOffer;
import tn.esprit.Entitys.Company;
import tn.esprit.Entitys.RecruitmentOffer;
import tn.esprit.Entitys.StatusApply;
import tn.esprit.Exceptions.MultiRessourceFoundException;
import tn.esprit.Exceptions.RessourceNotFoundException;
import tn.esprit.Libs.GenericCRUDService;
import tn.esprit.Repositorys.ApplyOnOfferRepository;
import tn.esprit.Repositorys.RecruitmentOfferRepository;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service("apply-on-offer-service")
public class ApplyOnOfferService extends GenericCRUDService<ApplyOnOffer,Long> implements IApplyOnOfferService  {
    private final ApplyOnOfferRepository applyOnOfferRepository;
    private final RecruitmentOfferRepository recruitmentOfferRepository;
    @Autowired
    public ApplyOnOfferService(ApplyOnOfferRepository applyOnOfferRepository ,
                               RecruitmentOfferRepository recruitmentOfferRepository){
        super(applyOnOfferRepository);
        this.applyOnOfferRepository = applyOnOfferRepository;
        this.recruitmentOfferRepository = recruitmentOfferRepository;}
    public ApplyOnOffer insert(ApplyOnOffer object) {
        object.setApplyAt(   LocalDateTime.now() );
        object.setStatutApply(StatusApply.ONHOLD);
        return  applyOnOfferRepository.save(object);
    }
    public ApplyOnOffer update(Long id, ApplyOnOffer object) {
        ApplyOnOffer applyOnOffer = applyOnOfferRepository.findById(id).
                orElseThrow(()-> new RessourceNotFoundException("Service ApplyOnOffer : update ApplyOnOffer not existe with id : "+id))  ;
        //applyOnOffer.setCoverLetter(object.getCoverLetter());
        //applyOnOffer.setSalaryDesired(object.getSalaryDesired());
        //applyOnOffer.setStartDate(object.getStartDate());
        applyOnOffer = applyOnOfferRepository.save(applyOnOffer);
        return applyOnOffer ;
    }
    @Override
    @Transactional
    public MsgReponseStatusDto updateStatusApply(String username, Long idApplyOnOffer, StatusApply statusApply) {
       Optional<ApplyOnOffer> applyOnOfferOptional = applyOnOfferRepository.findApplyOnOfferByIdAndUsername(idApplyOnOffer, username);
        if ( applyOnOfferOptional.isEmpty()){
            return  MsgReponseStatusDto.builder()
                    .title("Apply Offer")
                    .status(ReponseStatus.ERROR)
                    .datestamp(LocalDate.now())
                    .timestamp(LocalTime.now())
                    .message("Service ApplyOnOffer (updateStatusApply) : it  not existe with this username  : "+username +"or id ApplyOnOffer : " + idApplyOnOffer )
                    .build();}
        ApplyOnOffer  applyOnOffer = applyOnOfferOptional.get();
        applyOnOffer.setStatutApply(statusApply);
        applyOnOffer = applyOnOfferRepository.save(applyOnOffer);
        return   MsgReponseStatusDto.builder()
                                    .title("Apply Offer")
                                    .status(ReponseStatus.SUCCESSFUL)
                                    .datestamp(LocalDate.now())
                                    .timestamp(LocalTime.now())
                                    .message("Successful to apply in this offer")
                                    .build();
    }


    /*@Override
    @Transactional
    public ApplyOnOffer addApplyOnOfferByRecruitmentOfferAndAccount(
            ApplyOnOffer object , Long idRecruitmentOffer  ) {
        RecruitmentOffer recruitmentOffer = recruitmentOfferRepository.findById(idRecruitmentOffer).
                orElseThrow(
                        ()-> new RessourceNotFoundException("Service ApplyOnOffer (addApplyOnOfferByRecruitmentOfferAndAccount) :  recruitment offer  not existe with id recruitment : "+idRecruitmentOffer))  ;
        if ( applyOnOfferRepository.isCorrectBy( idRecruitmentOffer , object.getUsername()      ))
        {throw new MultiRessourceFoundException("Service ApplyOnOffer (addApplyOnOfferByRecruitmentOfferAndAccount) : multiple apply on offer existed");  }
        object.setApplyAt(   LocalDateTime.now() );
        object.setStatutApply(StatusApply.ONHOLD);
        object.addMultiAnswer(object.getAnswers());
        recruitmentOffer.addOffer(object);
        recruitmentOffer = recruitmentOfferRepository.save(recruitmentOffer);
        return this.searchApplyOnOfferViaId( recruitmentOffer.getApplyOnOffers()) ;
    }*/
    @Override
    @Transactional
    public MsgReponseStatusDto addApplyOnOfferByRecruitmentOfferAndAccount(
            ApplyOnOffer object , Long idRecruitmentOffer  ) {
        Optional<RecruitmentOffer> recruitmentOfferOptional = recruitmentOfferRepository.findById(idRecruitmentOffer);
        if ( recruitmentOfferOptional.isEmpty()){
            return  MsgReponseStatusDto.builder()
                .title("Apply Offer")
                .status(ReponseStatus.ERROR)
                .datestamp(LocalDate.now())
                .timestamp(LocalTime.now())
                .message("Service ApplyOnOffer (addApplyOnOfferByRecruitmentOfferAndAccount) :  recruitment offer  not existe with id recruitment : "+idRecruitmentOffer)
                .build();}
        RecruitmentOffer recruitmentOffer  = recruitmentOfferOptional.get();
        if ( applyOnOfferRepository.isCorrectBy( idRecruitmentOffer , object.getUsername()      ))
        {    return  MsgReponseStatusDto.builder()
                    .title("Apply Offer")
                    .status(ReponseStatus.UNSUCCESSFUL)
                    .datestamp(LocalDate.now())
                    .timestamp(LocalTime.now())
                    .message("Service ApplyOnOffer (addApplyOnOfferByRecruitmentOfferAndAccount) : multiple apply on offer existed")
                    .build(); }

        object.setApplyAt(   LocalDateTime.now() );
        object.setStatutApply(StatusApply.ONHOLD);
        object.addMultiAnswer(object.getAnswers());
        recruitmentOffer.addOffer(object);
        recruitmentOfferRepository.save(recruitmentOffer);
        return  MsgReponseStatusDto.builder()
               .title("Apply Offer")
               .status(ReponseStatus.SUCCESSFUL)
               .datestamp(LocalDate.now())
               .timestamp(LocalTime.now())
               .message("Successful to apply in this offer")
               .build();
    }




    @Override
    public List<ApplyOnOffer> selectByUsername(String username) {
        return applyOnOfferRepository.findApplyOnOffersByUsername( username);}
    public ApplyOnOffer searchApplyOnOfferViaId(List<ApplyOnOffer> listApplyOnOffers) {
        if (listApplyOnOffers == null || listApplyOnOffers.isEmpty()) {
            return null; // Return null if the list is empty or null
        }
        ApplyOnOffer maxIdlistApplyOnOffer = listApplyOnOffers.get(0); // Initialize with the first element
        for (ApplyOnOffer offer : listApplyOnOffers) {
            if (offer.getId() > maxIdlistApplyOnOffer.getId()) {
                maxIdlistApplyOnOffer = offer; // Update if a higher ID is found
            }
        }
        return maxIdlistApplyOnOffer;
    }
    @Override
    public void deleteByAccountIdAndIdRecruitmentOffer(String username ,Long RecruitmentOfferId){
        if ( !applyOnOfferRepository.isCorrectBy( RecruitmentOfferId ,     username  ))
        {throw new RessourceNotFoundException("Service ApplyOnOffer (deleteByAccountIdAndIdRecruitmentOffer) : Not Found accountId : "+ username+ " RecruitmentOfferId : " +RecruitmentOfferId);  }

        for ( ApplyOnOffer aoo : applyOnOfferRepository.findApplyOnOffersByUsernameAndByRecruitmentId( username,RecruitmentOfferId))
        {
            this.delete(aoo.getId());
        }
    }
}
   // long id;long accountId; String coverLetter; int salaryDesired;
   // LocalDate startDate;LocalDate applyAt; StatusApply statutApply;