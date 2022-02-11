package ch.mab.vakansie;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.endsWith;
import static org.hamcrest.Matchers.greaterThan;
import static org.hamcrest.Matchers.notNullValue;

import java.io.IOException;
import java.nio.file.Path;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.containers.wait.strategy.Wait;
import org.testcontainers.images.builder.ImageFromDockerfile;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

@Testcontainers
class SeleniumTests {

    /*
        todo rework docker image build. make
     */

    @Container
    private static GenericContainer FRONTEND_CONTAINER = new GenericContainer(new ImageFromDockerfile()
            .withFileFromPath(".", Path.of("../js-client-iteration-6"))
            // the frontend Dockerfile my not be located at the same location, where .withFileFromPath is including files.
            // Otherwise, the file overrides from below, will not work...

            // override server config files with preconfigured values
            .withFileFromClasspath("selenium-test.html", "selenium-test.html")
            .withFileFromClasspath("selenium-config.js", "selenium-config.js")
            .withFileFromClasspath("selenium-lighttpd.conf", "selenium-lighttpd.conf")
            .withFileFromClasspath("Dockerfile", "Dockerfile"))
            .withExposedPorts(3000)
            .waitingFor(Wait.forHttp("/").forStatusCode(200));

    // https://medium.com/@milosz.wozniak/how-to-setup-selenium-java-with-gradle-minimum-dependencies-c557b19c1967
    // test report : build/reports/tests/test/index.html
    private static WebDriver BROWSER;
    private static String FRONTEND_URL;

    @BeforeAll
    public static void setupWebdriverFirefoxDriver() throws IOException {
        System.setProperty("webdriver.gecko.driver", System.getProperty("user.dir") + "/src/test/resources/geckodriver");

    }

    @BeforeEach
    public void setup() {
        BROWSER = new FirefoxDriver();

        String host = FRONTEND_CONTAINER.getHost();
        Integer port = FRONTEND_CONTAINER.getFirstMappedPort();
        FRONTEND_URL = String.format("http://%s:%d/test.html", host, port);
    }

    @AfterEach
    public void teardown() {
        if (BROWSER != null) {
            BROWSER.quit();
        }
    }

    @Test
    void verifyVakansieTests() {
        BROWSER.get(FRONTEND_URL);
        WebElement total = BROWSER.findElement(By.id("grossTotal"));

        assertThat(total, notNullValue());

        // When test.html tests were successful, we expect a number followed by a string
        String amountOfSuccessfulTests = total.getText().split(" ")[0];
        assertThat(total.getText(), endsWith("Tests"));

        // there are roughly 140 tests at the moment.
        assertThat(Integer.parseInt(amountOfSuccessfulTests), greaterThan(147));
    }
}
