package com.dearme.posts;

import com.dearme.dtos.PostDataDto;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostController {
    PostService postService;
    
    public PostController(PostService postService) {
        this.postService = postService;
    }
    
    @GetMapping("/user/{id}") // todo: change after authentication
    public ResponseEntity<List<PostDto>> getUserPosts(@PathVariable Long userId){
        var posts = postService.findPostsFromUser(userId);
        return ResponseEntity.ok().body(posts);
    }
    
    @PostMapping("/user/{id}") // todo: change after auth
    public ResponseEntity<PostDto> createPost(@PathVariable Long userId, @Valid @RequestBody PostDataDto postData){
        var savedPost = postService.save(postData);
        return new ResponseEntity<>(savedPost, HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<PostDto> updatePost(@PathVariable Long postId, @Valid @RequestBody PostDataDto postData){
        var updatedPost = postService.updatePost(postId, postData);
        return new ResponseEntity<>(updatedPost, HttpStatus.OK);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<PostDto> deletePost(@PathVariable Long postId){
        postService.deletePost(postId);
        return ResponseEntity.noContent().build();
    }
}
