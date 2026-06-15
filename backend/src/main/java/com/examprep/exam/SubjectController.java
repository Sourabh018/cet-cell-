package com.examprep.exam;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/subjects")
@RequiredArgsConstructor
public class SubjectController {
    
    private final SubjectRepository subjectRepository;
    
    @GetMapping
    public ResponseEntity<List<Subject>> getAllSubjects() {
        return ResponseEntity.ok(subjectRepository.findAll());
    }

    @GetMapping("/class/{classLevel}")
    public ResponseEntity<List<Subject>> getSubjectsByClassLevel(@PathVariable int classLevel) {
        return ResponseEntity.ok(subjectRepository.findByClassLevelIn(List.of(0, classLevel)));
    }
}
