package io.getarrays.contactapi.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TodoDto {
    private String id;
    private String task;
    private Boolean isCompleted;
    private String dateCompleted;
    private String dateCreated;
    private Boolean isStarred;
    
}
