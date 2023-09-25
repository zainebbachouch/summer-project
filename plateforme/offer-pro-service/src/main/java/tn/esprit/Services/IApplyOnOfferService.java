package tn.esprit.Services;


import tn.esprit.Dtos.MsgReponseStatusDto;
import tn.esprit.Entitys.ApplyOnOffer;
import tn.esprit.Entitys.StatusApply;
import tn.esprit.Libs.IGenericCRUD;

import java.util.List;

public interface IApplyOnOfferService extends IGenericCRUD<ApplyOnOffer,Long> {
    MsgReponseStatusDto updateStatusApply(String username, Long idApplyOnOffer, StatusApply statusApply);
    MsgReponseStatusDto addApplyOnOfferByRecruitmentOfferAndAccount(ApplyOnOffer object , Long idRecruitmentOffer  );
    List<ApplyOnOffer> selectByUsername(String username );
    void deleteByAccountIdAndIdRecruitmentOffer( String username,Long RecruitmentOfferId);
}