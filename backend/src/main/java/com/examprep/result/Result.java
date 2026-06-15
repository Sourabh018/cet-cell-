package com.examprep.result;

import com.examprep.exam.Exam;
import com.examprep.exam.ExamAttempt;
import com.examprep.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "results")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Result {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "attempt_id", nullable = false, unique = true)
    private ExamAttempt attempt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exam_id", nullable = false)
    private Exam exam;

    private int totalQuestions;
    private int attempted;
    private int correct;
    private int wrong;
    private int skipped;

    @Column(columnDefinition = "numeric")
    private double rawScore;
    @Column(columnDefinition = "numeric")
    private double negativeMarks;
    @Column(columnDefinition = "numeric")
    private double finalScore;
    @Column(columnDefinition = "numeric")
    private double maxScore;
    @Column(columnDefinition = "numeric")
    private double percentage;
    private int timeTakenSeconds;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "result", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<TopicScore> topicScores = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
