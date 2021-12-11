package ch.mab.sista.event;

import java.time.LocalDate;
import javax.validation.constraints.NotNull;

public record EventDto(@NotNull String userId, String id, @NotNull LocalDate from, @NotNull LocalDate to) {

}
