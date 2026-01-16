package com.dearme.users;

import com.dearme.posts.Post;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity(name = "users")
@Getter
@Setter
public class UserAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String pwdHash;

    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Post> posts;

    public UserAccount() {
    }
    
    public UserAccount(String username, String email, String pwdHash) {
        this.username = username;
        this.email = email;
        this.pwdHash = pwdHash;
    }
}
