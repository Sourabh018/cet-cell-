package com.examprep.result;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface TopicScoreRepository extends JpaRepository<TopicScore, UUID> {
}
