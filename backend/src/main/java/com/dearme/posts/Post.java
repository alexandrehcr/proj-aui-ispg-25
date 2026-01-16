package com.dearme.posts;

import com.dearme.users.UserAccount;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity(name = "posts")
@Getter @Setter
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;
    
    private String coverB64;

    @Column(nullable = false)
    private String title;
    
    @Column(nullable = false)
    private String content;
    
    @Column(nullable = false)
    private LocalDateTime created;
    
    @Column(nullable = false)
    private LocalDateTime modified;

    @ManyToOne(optional = false)
    @JoinColumn(name="user_id", nullable = false)
    private UserAccount author;

    public Post() {
    }

    public Post(String coverB64, String title, String content, LocalDateTime created, UserAccount author) {
        this.coverB64 = coverB64;
        this.title = title;
        this.content = content;
        this.created = created;
        this.author = author;
    }
}
