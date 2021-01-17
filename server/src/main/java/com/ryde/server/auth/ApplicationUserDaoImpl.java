package com.ryde.server.auth;

import com.ryde.server.entities.User;
import com.ryde.server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Optional;

@Repository
public class ApplicationUserDaoImpl implements ApplicationUserDao{
//    @PersistenceContext
//    private EntityManager em;
    @Autowired
    UserRepository userRepository;

    @Override
    public Optional<ApplicationUser> selectApplicationUserByUsername(String username) {
        Optional<User> user = userRepository.findUserByEmail(username);

        if (user.isEmpty())
            return Optional.empty();

        ApplicationUser applicationUser = new ApplicationUser(
                user.get().getPassword(),
                user.get().getEmail(),
                null,
                true,
                true,
                true,
                true);

        return Optional.of(applicationUser);
    }
}
