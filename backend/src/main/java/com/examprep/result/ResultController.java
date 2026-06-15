package com.examprep.result;

import com.examprep.result.dto.AnalyticsDTO;
import com.examprep.result.dto.ResultDTO;
import com.examprep.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/results")
@RequiredArgsConstructor
public class ResultController {

    private final ResultService resultService;

    @PostMapping("/{attemptId}")
    public ResponseEntity<ResultDTO> calculateResult(@PathVariable UUID attemptId, @AuthenticationPrincipal User user) {
        try {
            return ResponseEntity.ok(resultService.calculateAndSaveResult(attemptId, user));
        } catch (DataIntegrityViolationException e) {
            // Race condition: another concurrent request already inserted the result
            return ResponseEntity.ok(resultService.getResult(attemptId, user));
        }
    }

    @GetMapping("/{attemptId}")
    public ResponseEntity<ResultDTO> getResult(@PathVariable UUID attemptId, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(resultService.getResult(attemptId, user));
    }

    @GetMapping("/analytics")
    public ResponseEntity<AnalyticsDTO> getAnalytics(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(resultService.getAnalytics(user));
    }
}
