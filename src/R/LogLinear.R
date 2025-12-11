###############################################
# 1. Setup
# Simulate Titanic-style binary outcome data
# and export scatter + linear/logit/probit curves
###############################################

# Packages
library(tibble)
library(ggplot2)
library(jsonlite)
library(here)

###############################################
# 2. Simulate data (same process as original Shiny app)
###############################################

set.seed(2)

# Binary outcome: 0 and 1, repeated 250 times each
y <- rep(c(0, 1), each = 250)

# Predictor x is generated from two different normal distributions:
#   - If y = 0: mean 3, sd 3
#   - If y = 1: mean 10, sd 3
# This creates well-separated clusters and a clean S-shaped curve under logit/probit.
x <- 10 + rnorm(250, 3, 3) + rnorm(250, 10, 3) * y

# Combine into a tibble
data <- tibble(x, y)

# Export scatter data for React
write_json(
  data,
  here("src", "data", "titanic_scatter.json"),
  pretty = TRUE
)

###############################################
# 3. Create smooth x-grid for model predictions
###############################################

xs <- seq(min(x), max(x), length.out = 200)

###############################################
# 4. Logistic Regression Curve
###############################################

m_logit <- glm(y ~ x, family = binomial)

logit_curve <- tibble(
  x = xs,
  y = predict(m_logit, newdata = tibble(x = xs), type = "response")
)

write_json(
  logit_curve,
  here("src", "data", "logit_curve.json"),
  pretty = TRUE
)

###############################################
# 5. Linear Regression Curve
###############################################

m_lin <- lm(y ~ x)

linear_curve <- tibble(
  x = xs,
  y = predict(m_lin, newdata = tibble(x = xs))
)

write_json(
  linear_curve,
  here("src", "data", "linear_curve.json"),
  pretty = TRUE
)

###############################################
# 6. Probit Regression Curve
###############################################

m_probit <- glm(y ~ x, family = binomial(link = "probit"))

probit_curve <- tibble(
  x = xs,
  y = predict(m_probit, newdata = tibble(x = xs), type = "response")
)

write_json(
  probit_curve,
  here("src", "data", "probit_curve.json"),
  pretty = TRUE
)

###############################################
# Done!
###############################################
