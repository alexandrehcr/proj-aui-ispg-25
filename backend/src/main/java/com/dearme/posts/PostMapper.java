package com.dearme.posts;

import com.dearme.users.UserAccount;
import com.dearme.dtos.PostDataDto;

import java.time.LocalDateTime;

public class PostMapper {
    
    private PostMapper() {
    }
    
    public static Post toEntity(PostDataDto postData, UserAccount user) {
        return new Post(postData.coverB64(), postData.title(), postData.content(), LocalDateTime.now(), user);
    }
    
    public static PostDto toDto(Post post) {
        return new PostDto(post.getId(), post.getAuthor().getId(), post.getTitle(), post.getContent(), post.getCoverB64());
    }
}
