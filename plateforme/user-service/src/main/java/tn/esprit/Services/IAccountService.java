package tn.esprit.Services;


import tn.esprit.Entitys.Account;
import tn.esprit.Libs.IGenericCRUD;

import java.util.List;

public interface IAccountService extends IGenericCRUD<Account,Long> {
    Account selectbyUsername(String  Username);
    List<Account> selectbyMultipleUsername(String[] usernames);
}
