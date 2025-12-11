set.seed(2)
y <- rep(c(0, 1), 500)
x <- 10 + rnorm(250, 3, 3) + rnorm(250, 10, 3) * y
data <- tibble::tibble(x, y)

#jsonlite::write_json(data, "titanic_scatter.json")

library(ggplot2)

# Logistic model
m_logit <- glm(y ~ x, family = binomial)
xs <- seq(min(x), max(x), length = 200)
logit_y <- predict(m_logit, newdata = data.frame(x = xs), type = "response")

jsonlite::write_json(
  tibble::tibble(x = xs, y = logit_y),
  "logit_curve.json"
)

# Linear model
m_lin <- lm(y ~ x)
lin_y <- predict(m_lin, newdata = data.frame(x = xs))

jsonlite::write_json(
  tibble::tibble(x = xs, y = lin_y),
  "linear_curve.json"
)

library(jsonlite)
library(tibble)

# Assuming you still have x, y, and data from your original simulation
# (same as for linear/logit)

# Fit PROBIT model
m_probit <- glm(y ~ x, family = binomial(link = "probit"))

# Create smooth x-grid
xs <- seq(min(x), max(x), length = 200)

# Predicted probabilities
probit_y <- predict(m_probit, newdata = data.frame(x = xs), type = "response")

# Export as JSON
write_json(
  tibble(x = xs, y = probit_y),
  "probit_curve.json",
  pretty = TRUE
)

