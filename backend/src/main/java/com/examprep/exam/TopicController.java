package com.examprep.exam;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/topics")
@RequiredArgsConstructor
public class TopicController {

    private final TopicRepository topicRepository;

    @GetMapping("/subject/{subjectId}")
    public ResponseEntity<List<Topic>> getTopicsBySubject(@PathVariable String subjectId) {
        UUID id = UUID.fromString(subjectId);
        return ResponseEntity.ok(topicRepository.findBySubjectId(id));
    }

    @GetMapping("/subject/{subjectId}/class/{classLevel}")
    public ResponseEntity<List<Topic>> getTopicsBySubjectAndClass(
            @PathVariable String subjectId,
            @PathVariable int classLevel) {
        UUID id = UUID.fromString(subjectId);
        return ResponseEntity.ok(topicRepository.findBySubjectIdAndClassLevelOrderByChapterNumberAsc(id, classLevel));
    }
}
