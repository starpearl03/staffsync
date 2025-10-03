package com.example.demo.repository;

import com.example.demo.model.NotificationSeenBy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationSeenByRepository extends JpaRepository<NotificationSeenBy, Long> {
}
