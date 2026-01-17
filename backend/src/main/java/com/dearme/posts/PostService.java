package com.dearme.posts;

import com.dearme.dtos.PostDataDto;
import com.dearme.users.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PostService {

    private PostRepository postRepository;
    private UserService userService;

    public PostService(PostRepository postRepository, UserService userService) {
        this.postRepository = postRepository;
        this.userService = userService;
    }

    public PostDto save(Long userId, PostDataDto postData) {
        var user = userService.findUserAccountById(userId);
        var newPost = PostMapper.toEntity(postData, user);
        var savedPost = postRepository.save(newPost);
        return PostMapper.toDto(savedPost);
    }

    public PostDto updatePost(Long postId, PostDataDto postData) {
        var post = findPostById(postId);
        post.setContent(postData.content());
        post.setTitle(postData.title());
        post.setCoverB64(postData.coverB64());
        post.setModified(LocalDateTime.now());
        postRepository.save(post);
        return PostMapper.toDto(post);
    }

    public List<PostDto> findPostsFromUser(Long userId) {
        var user = userService.findUserAccountById(userId);
        return user.getPosts().stream().map(PostMapper::toDto).toList();
    }

    public void deletePost(Long postId) {
        var post = findPostById(postId);
        postRepository.delete(post);
    }

    public Post findPostById(Long id) throws EntityNotFoundException {
        return postRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("post_not_found"));
    }
}
