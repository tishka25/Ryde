package com.ryde.server.auth;

import com.ryde.server.entities.User;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.Optional;

@Repository
public class ApplicationUserDaoImpl implements ApplicationUserDao{
    @PersistenceContext
    private EntityManager em;

    @Override
    public Optional<ApplicationUser> selectApplicationUserByUsername(String username) {
        List resultList =  em.createQuery("SELECT u FROM User u WHERE u.email = :username")
                .setParameter("username", username).getResultList();

        if (resultList.isEmpty())
            return Optional.empty();

        User resultUser = (User) resultList.get(0);
        ApplicationUser applicationUser = new ApplicationUser(
                resultUser.getPassword(),
                resultUser.getEmail(),
                null,
                true,
                true,
                true,
                true);

        return Optional.of(applicationUser);
    }
}
