package com.dearme.posts;

public record PostDto(
        Long postId,
        Long userId,
        String title,
        String content,
        String coverB64) {
}
