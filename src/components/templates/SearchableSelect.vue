<template>
  <div class="searchable-select-container">
    <div
      class="select-input"
      @click="toggleDropdown"
      :class="{ 'is-open': isOpen }"
    >
      <input
        type="text"
        v-model="searchQuery"
        @click.stop
        @input="handleSearch"
        :placeholder="placeholder"
        class="form-control form-control-lg"
        ref="searchInput"
      />
      <span class="dropdown-arrow">▼</span>
    </div>

    <div v-if="isOpen" class="options-container">
      <div
        v-for="option in filteredOptions.slice(0, 10)"
        :key="option.id"
        class="option-item"
        :class="{ 'selected': option.id === modelValue }"
        @click="selectOption(option)"
      >
        <span v-html="highlightMatch(option.name)"></span>
      </div>
      <div v-if="filteredOptions.length === 0" class="no-results">
        No results found
      </div>
      <div v-if="filteredOptions.length > 10" class="more-results">
        {{ filteredOptions.length - 10 }} more results...
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchableSelect',
  props: {
    options: {
      type: Array,
      required: true
    },
    modelValue: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: 'Search...'
    }
  },
  data() {
    return {
      isOpen: false,
      searchQuery: '',
      selectedOption: null,
      internalValue: this.modelValue
    }
  },
  computed: {
    filteredOptions() {
      if (!this.searchQuery) return this.options;

      const query = this.searchQuery.toLowerCase();
      return this.options.filter(option =>
        option.name.toLowerCase().includes(query)
      );
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
    this.setInitialValue();
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    setInitialValue() {
      const selected = this.options.find(opt => opt.id === this.modelValue);
      if (selected) {
        this.searchQuery = selected.name;
        this.internalValue = selected.id;
      }
    },
    toggleDropdown() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.$nextTick(() => {
          this.$refs.searchInput.focus();
        });
      } else {
        // Reset search query to selected value when closing dropdown
        const selected = this.options.find(opt => opt.id === this.internalValue);
        if (selected) {
          this.searchQuery = selected.name;
        }
      }
    },
    handleSearch() {
      this.isOpen = true;
      // Don't update the selection while searching
    },
    selectOption(option) {
      this.searchQuery = option.name;
      this.internalValue = option.id;
      this.$emit('update:modelValue', option.id);
      this.$emit('change', option.id); // This triggers handleCoinChange
      this.isOpen = false;
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.isOpen = false;
        // Reset search query to selected value when clicking outside
        const selected = this.options.find(opt => opt.id === this.internalValue);
        if (selected) {
          this.searchQuery = selected.name;
        }
      }
    },
    highlightMatch(text) {
      if (!this.searchQuery) return text;

      const regex = new RegExp(`(${this.searchQuery})`, 'gi');
      return text.replace(regex, '<mark>$1</mark>');
    }
  },
  watch: {
    modelValue: {
      handler(newVal) {
        const selected = this.options.find(opt => opt.id === newVal);
        if (selected && !this.isOpen) {
          this.searchQuery = selected.name;
          this.internalValue = selected.id;
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
.searchable-select-container {
  position: relative;
  width: 100%;
}

.select-input {
  position: relative;
  cursor: pointer;
}

.dropdown-arrow {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.options-container {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 300px;
  overflow-y: auto;
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  z-index: 1000;
  margin-top: 4px;
}

.option-item {
  padding: 8px 12px;
  cursor: pointer;
}

.option-item:hover {
  background-color: #f8f9fa;
}

.option-item.selected {
  background-color: #e9ecef;
}

.no-results, .more-results {
  padding: 8px 12px;
  color: #6c757d;
  font-style: italic;
}

mark {
  background-color: #fff3cd;
  padding: 0 2px;
  border-radius: 2px;
}
</style>
