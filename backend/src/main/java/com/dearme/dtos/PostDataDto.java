package com.dearme.dtos;

import jakarta.validation.constraints.NotBlank;

public record PostDataDto(
        @NotBlank(message = "post_title_empty")
        String title,

        @NotBlank(message = "post_content_empty")
        String content,
        
        String coverB64) {
}
