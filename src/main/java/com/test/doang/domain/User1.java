package com.test.doang.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

import com.test.doang.domain.enumeration.TaskMode;

/**
 * A User1.
 */
@Entity
@Table(name = "user_1")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class User1 implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "task_mode", nullable = false)
    private TaskMode taskMode;

    @NotNull
    @Column(name = "value", nullable = false)
    private Integer value;

    @ManyToOne
    @JsonIgnoreProperties(value = "user1s", allowSetters = true)
    private User1 referral;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TaskMode getTaskMode() {
        return taskMode;
    }

    public User1 taskMode(TaskMode taskMode) {
        this.taskMode = taskMode;
        return this;
    }

    public void setTaskMode(TaskMode taskMode) {
        this.taskMode = taskMode;
    }

    public Integer getValue() {
        return value;
    }

    public User1 value(Integer value) {
        this.value = value;
        return this;
    }

    public void setValue(Integer value) {
        this.value = value;
    }

    public User1 getReferral() {
        return referral;
    }

    public User1 referral(User1 user1) {
        this.referral = user1;
        return this;
    }

    public void setReferral(User1 user1) {
        this.referral = user1;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof User1)) {
            return false;
        }
        return id != null && id.equals(((User1) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "User1{" +
            "id=" + getId() +
            ", taskMode='" + getTaskMode() + "'" +
            ", value=" + getValue() +
            "}";
    }
}
