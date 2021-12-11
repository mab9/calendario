package ch.mab.sista.statement;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("statement")
public class StatementController {

    @GetMapping
    @ResponseBody
    public String getStatements() {
        return "Gans";
    }

    // curl -X POST --data "I love koding" "localhost:8080/statement/json" -H "Content-Type:application/json"
    @PostMapping("json")
    @ResponseBody
    public String postStatementRequestBody(@RequestBody String statement) {
        return "New statement: " + statement;
    }

    // curl -X POST "localhost:8080/statement/plain/7"
    @PostMapping("plain/{id}")
    @ResponseBody
    public String postStatementPathVariable(@PathVariable Long id) {
        return "New statement: I love SQL " + id;
    }

    // curl -X POST "localhost:8080/statement/plain?id=23"
    @PostMapping("plain")
    @ResponseBody
    public String postStatementPlainRequestParam(@RequestParam Long id) {
        return "New statement: I love JAVA " + id;
    }
}
