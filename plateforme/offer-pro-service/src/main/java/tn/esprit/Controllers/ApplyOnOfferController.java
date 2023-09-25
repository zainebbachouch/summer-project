package tn.esprit.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import tn.esprit.Dtos.ApplyOnOfferDto;
import tn.esprit.Dtos.MsgReponseStatusDto;
import tn.esprit.Dtos.RecruitmentOfferDto;
import tn.esprit.Entitys.ApplyOnOffer;
import tn.esprit.Entitys.RecruitmentOffer;
import tn.esprit.Entitys.StatusApply;
import tn.esprit.Libs.GenericCRUDController;
import tn.esprit.Libs.GenericCRUDControllerDto;
import tn.esprit.Libs.IGenericMapperDto;
import tn.esprit.Services.IApplyOnOfferService;

import java.util.List;
import java.util.stream.Collectors;


@Controller
@RestController
@RequestMapping("/apply-on-offer")
public class ApplyOnOfferController extends GenericCRUDControllerDto<ApplyOnOfferDto,ApplyOnOffer,Long> {
    private final IApplyOnOfferService iApplyOnOfferService;
    private final IGenericMapperDto<ApplyOnOfferDto, ApplyOnOffer> applyOnOfferDtoMapper;

    @Autowired
    public ApplyOnOfferController( @Qualifier("apply-on-offer-service") IApplyOnOfferService iApplyOnOfferService,
                                   IGenericMapperDto<ApplyOnOfferDto, ApplyOnOffer> applyOnOfferDtoMapper)
    { super(iApplyOnOfferService,applyOnOfferDtoMapper);
        this.applyOnOfferDtoMapper = applyOnOfferDtoMapper;
        this.iApplyOnOfferService = iApplyOnOfferService;}

    @PutMapping("/update-atatus-apply/{username}/{idApplyOnOffer}/{statusApply}")
    public MsgReponseStatusDto updateStatusApply(@PathVariable("username")   String username,
                                          @PathVariable("idApplyOnOffer")   Long idApplyOnOffer,
                                          @PathVariable("statusApply")   StatusApply statusApply ) throws Exception {
        return iApplyOnOfferService.updateStatusApply(  username,  idApplyOnOffer,  statusApply);}

    /*@PutMapping("/add-by-recruitment-offer-and-by-account/{idRecruitmentOffer}")
    public MsgReponseStatusDto addApplyOnOfferByRecruitmentOfferAndAccount(@RequestBody ApplyOnOffer object,
                                                                           @PathVariable("idRecruitmentOffer")   Long idRecruitmentOffer )  {
        ApplyOnOffer Obj = iApplyOnOfferService.addApplyOnOfferByRecruitmentOfferAndAccount(  object ,  idRecruitmentOffer );
        return applyOnOfferDtoMapper.mapToDto(Obj ,  Obj.getClass());}*/
    @PutMapping("/add-by-recruitment-offer-and-by-account/{idRecruitmentOffer}")
    public MsgReponseStatusDto addApplyOnOfferByRecruitmentOfferAndAccount(@RequestBody ApplyOnOffer object,
                                                                           @PathVariable("idRecruitmentOffer")   Long idRecruitmentOffer )  {
        return iApplyOnOfferService.addApplyOnOfferByRecruitmentOfferAndAccount(  object ,  idRecruitmentOffer );
        }
    @GetMapping("/username/{username}")
    public List<ApplyOnOfferDto>  SelectByUsername(@PathVariable("username") String username )  {
        List<ApplyOnOffer>  listApplyOnOffers = iApplyOnOfferService.selectByUsername(   username ) ;
        return listApplyOnOffers.stream()
                .map(Obj -> applyOnOfferDtoMapper.mapToDto(Obj ,  Obj.getClass()))
                .collect(Collectors.toList());
    }
    @DeleteMapping("/account-id/{username}/recruitment-offer-id/{RecruitmentOfferId}")
    public ResponseEntity<HttpStatus> DeleteByAccountIdAndIdRecruitmentOffer(@PathVariable("username")String username, @PathVariable("RecruitmentOfferId")Long RecruitmentOfferId )  {
        iApplyOnOfferService.deleteByAccountIdAndIdRecruitmentOffer(  username , RecruitmentOfferId) ;
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}