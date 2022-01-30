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

class SeleniumTests {

    // https://medium.com/@milosz.wozniak/how-to-setup-selenium-java-with-gradle-minimum-dependencies-c557b19c1967
    // test report : build/reports/tests/test/index.html
    private WebDriver driver;

    @BeforeAll
    public static void setupWebdriverFirefoxDriver() {
        System.setProperty("webdriver.gecko.driver", System.getProperty("user.dir") + "/src/test/resources/geckodriver");
    }

    @BeforeEach
    public void setup() {
        driver = new FirefoxDriver();
    }

    @AfterEach
    public void teardown() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Test
    void verifyVakansieTests() {
        driver.get("http://localhost:3000/test.html");
        WebElement total = driver.findElement(By.id("grossTotal"));
        assertThat(total, notNullValue());

        // When tests were successful, we expect a number followed by a string
        String amountOfSuccessfulTests = total.getText().split(" ")[0];
        assertThat(total.getText(), endsWith("Tests"));
        assertThat(Integer.parseInt(amountOfSuccessfulTests), greaterThan(140)); // there are roughly 140 tests at the moment.
    }
}
