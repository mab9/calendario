package ch.mab.vakansie.vakansie;


import java.time.LocalDate;
import javax.validation.constraints.NotNull;

// @DateTimeFormat(pattern = "yyyy.MM.dd") LocalDate
public record VakansieDate(@NotNull(message = "Please provide from date.") LocalDate from,
                           @NotNull(message = "Please provide to date.") LocalDate to) {

}
