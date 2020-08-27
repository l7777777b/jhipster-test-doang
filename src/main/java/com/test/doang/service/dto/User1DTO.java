package com.test.doang.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import com.test.doang.domain.enumeration.TaskMode;

/**
 * A DTO for the {@link com.test.doang.domain.User1} entity.
 */
public class User1DTO implements Serializable {
    
    private Long id;

    @NotNull
    private TaskMode taskMode;

    @NotNull
    private Integer value;


    private Long referralId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TaskMode getTaskMode() {
        return taskMode;
    }

    public void setTaskMode(TaskMode taskMode) {
        this.taskMode = taskMode;
    }

    public Integer getValue() {
        return value;
    }

    public void setValue(Integer value) {
        this.value = value;
    }

    public Long getReferralId() {
        return referralId;
    }

    public void setReferralId(Long user1Id) {
        this.referralId = user1Id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof User1DTO)) {
            return false;
        }

        return id != null && id.equals(((User1DTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "User1DTO{" +
            "id=" + getId() +
            ", taskMode='" + getTaskMode() + "'" +
            ", value=" + getValue() +
            ", referralId=" + getReferralId() +
            "}";
    }
}
