package com.examprep.result;

import com.examprep.exam.Topic;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "topic_scores")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TopicScore {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "result_id", nullable = false)
    private Result result;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topic_id", nullable = false)
    private Topic topic;

    @Column(nullable = false)
    private String topicName;

    private int totalQuestions;
    private int correct;
    private int wrong;
    private int skipped;
    @Column(columnDefinition = "numeric")
    private double accuracyPercentage;
}
