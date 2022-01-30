package ch.mab.vakansie;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.endsWith;
import static org.hamcrest.Matchers.greaterThan;
import static org.hamcrest.Matchers.notNullValue;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.utility.DockerImageName;

@Testcontainers
class SeleniumTests {


    // https://medium.com/@milosz.wozniak/how-to-setup-selenium-java-with-gradle-minimum-dependencies-c557b19c1967
    // test report : build/reports/tests/test/index.html
    private static WebDriver BROWSER;

    // In situations where there is no pre-existing Docker image,
    // Testcontainers can create a new temporary image on-the-fly from a Dockerfile.
    // https://www.testcontainers.org/features/creating_images/
    @Container
    private static final GenericContainer FRONTEND_CONTAINER = new GenericContainer(DockerImageName.parse("lighttpd")).withExposedPorts(3000);
    private static String FRONTEND_URL;

    @BeforeAll
    public static void setupWebdriverFirefoxDriver() {
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
        assertThat(Integer.parseInt(amountOfSuccessfulTests), greaterThan(140));
    }
}
