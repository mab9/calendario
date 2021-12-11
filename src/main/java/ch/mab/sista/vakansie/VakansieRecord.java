package ch.mab.sista.vakansie;

import javax.validation.constraints.NotNull;

public record VakansieRecord(@NotNull String from, @NotNull String to) {
}
