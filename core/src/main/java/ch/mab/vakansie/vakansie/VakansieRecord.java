package ch.mab.vakansie.vakansie;

import javax.validation.constraints.NotNull;

public record VakansieRecord(@NotNull String from, @NotNull String to) {
}
