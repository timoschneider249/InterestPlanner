<template>
  <div
    class="about-container d-flex align-items-center justify-content-center min-vh-100"
  >
    <div class="card shadow-lg">
      <div class="card-header bg-primary text-white">
        <h2 class="mb-0 text-center">About InterestPlanner</h2>
      </div>
      <div class="card-body">
        <div class="text-center mb-4">
          <div class="app-icon mb-3">
            <i class="bi bi-calculator fs-1 text-primary"></i>
          </div>
          <h4 class="text-muted">Financial Planning Made Simple</h4>
        </div>

        <div class="info-section">
          <div class="mb-3">
            <h5 class="text-primary">Description</h5>
            <p class="text-muted">
              InterestPlanner is a tool designed to simplify your financial
              calculations. Calculate ROI and analyze token-related data with
              our user-friendly interface.
            </p>
          </div>

          <div class="mb-3">
            <h5 class="text-primary">Features</h5>
            <ul class="list-unstyled">
              <li>
                <i class="bi bi-check2-circle me-2 text-success"></i>ROI
                Calculator
              </li>
              <li>
                <i class="bi bi-check2-circle me-2 text-success"></i>Token
                Analysis
              </li>
              <li>
                <i class="bi bi-check2-circle me-2 text-success"></i>Real-time
                Calculations
              </li>
            </ul>
          </div>

          <div class="app-details mt-4">
            <div class="row text-center">
              <div class="col-4">
                <div class="detail-item">
                  <small class="text-muted">Version</small>
                  <div class="fw-bold">0.1.0</div>
                </div>
              </div>
              <div class="col-4">
                <div class="detail-item">
                  <small class="text-muted">Author</small>
                  <div class="fw-bold">Timo Schneider</div>
                </div>
              </div>
              <div class="col-4">
                <div class="detail-item">
                  <small class="text-muted">Released</small>
                  <div class="fw-bold">2024</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer text-center">
        <button @click="close" class="btn btn-primary">
          <i class="bi bi-x-circle me-2"></i>Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const close = () => {
  window.close();
};
</script>

<style scoped></style>
