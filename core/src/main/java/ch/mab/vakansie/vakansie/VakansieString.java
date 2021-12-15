package ch.mab.vakansie.vakansie;


import javax.validation.constraints.NotNull;

public class VakansieString {

    @NotNull
    private String from;

    @NotNull
    private String to;

    public VakansieString() {
    }

    public VakansieString(String from, String to) {
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
