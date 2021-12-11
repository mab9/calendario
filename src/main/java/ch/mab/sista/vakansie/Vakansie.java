package ch.mab.sista.vakansie;


import javax.validation.constraints.NotNull;

//public record Vakansie(String from, String to) {
public class Vakansie {

    @NotNull
    private String from;
    private String to;

    public Vakansie() {
    }

    public Vakansie(String from, String to) {
        this.from = from;
        this.to = to;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    @Override
    public String toString() {
        return "Vakansie{" +
            "from='" + from + '\'' +
            ", to='" + to + '\'' +
            '}';
    }
}
