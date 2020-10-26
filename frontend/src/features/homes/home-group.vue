<template>
  <q-card>
    <q-card-section class="row justify-end text-black bg-grey-4">
      <div class="col-12 col-sm-8">
        <q-icon name="fa fa-cubes" class="q-mr-sm ellipsis" /> {{ group.name }}
        <q-btn
          size="sm"
          @click="$emit('edit-clicked', group)"
          outline
          class="q-ml-md text-black bg-white"
          >{{ $i18n.t("homeGroup-editButton-text") }}</q-btn
        >
      </div>
      <div class="col-12 col-sm-4">
        <span class="q-gutter-sm float-right">
          <q-btn
            @click="showAddHome = true"
            size="sm"
            class="text-white bg-primary"
          >
            <q-icon size="xs" class="fa fa-home" />&nbsp;&nbsp;{{
              $i18n.t("homes-homeGroup-addNewButton-home")
            }}
          </q-btn>

          <q-btn
            @click="showAssignManager = true"
            size="sm"
            class="bg-standard"
          >
            <q-icon size="xs" class="fa fa-home" />&nbsp;&nbsp;{{
              $i18n.t("homes-homeGroup-assignManagerButton-home")
            }}
          </q-btn>
        </span>
      </div>
    </q-card-section>

    <q-card-section>
      <span class="text-grey-9"> {{ $i18n.t("homeGroup-tableCaption") }}</span>
      <q-table
        class="q-mt-md"
        :data="homes"
        :columns="columns"
        row-key="_id"
        :loading="loading"
        :no-data-label="$i18n.t('homeGroup-noHomesAdded-text')"
        :rows-per-page-options="[10, 25, 50, 100]"
      >
        <template v-slot:body-cell-activityLevel="props">
          <q-td :props="props">
            <div :id="`activityLevelCountsChart-${props.row._id}`"></div>
          </q-td>
        </template>

        <template v-slot:header-cell-name="props">
          <q-th :props="props">
            <q-icon name="fa fa-home" class="q-mr-sm" />{{ props.col.label }}
          </q-th>
        </template>

        <template v-slot:header-cell-activityLevel="props">
          <q-th :props="props">
            {{ props.col.label }}
            <div class="float-right">
              <q-icon class="legend-inactive" name="fa fa-square" />&nbsp;
              {{ $i18n.t("homeGroup-activityLevelsLegend-inactive") }}
              <q-icon class="legend-semiactive" name="fa fa-square" />&nbsp;
              {{ $i18n.t("homeGroup-activityLevelsLegend-semiActive") }}
              <q-icon class="legend-active" name="fa fa-square" />&nbsp;
              {{ $i18n.t("homeGroup-activityLevelsLegend-active") }}
            </div>
          </q-th>
        </template>

        <template v-slot:body-cell-viewHome="props">
          <q-td :props="props">
            <q-btn
              @click="$router.push(`/homes/${props.row._id}`)"
              size="sm"
              outline
              class="text-black bg-white"
            >
              <q-icon name="fa fa-eye" class="q-mr-sm" />
              {{ $i18n.t("homeGroup-home-viewButton-text") }}
            </q-btn>
          </q-td>
        </template>

        <template v-slot:body-cell-viewReport="props">
          <q-td :props="props">
            <q-btn
              @click="$router.push(`/homes/${props.row._id}/report`)"
              size="sm"
              outline
              class="text-black bg-white"
            >
              <q-icon name="fa fa-chart-line" class="q-mr-sm" />
              {{ $i18n.t("homeGroup-home-reportButton-text") }}
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card-section>

    <add-home v-if="showAddHome" :group-id="group._id" @close="close" />
    <assign-manager
      v-if="showAssignManager"
      :group-id="group._id"
      @close="closeManager"
    />
  </q-card>
</template>

<script>
import { getHomesWithActivityLevel } from "./services/homes-list";
import { renderChart } from "./services/home-activity-levels.chart";
import AddHome from "./add-home";
import AssignManager from "./assign-manager";

export default {
  props: {
    group: { type: Object, required: true }
  },

  components: {
    AddHome,
    AssignManager
  },

  data() {
    return {
      homes: [],
      loading: false,
      showAddHome: false,
      showAssignManager: false,
      columns: [
        {
          name: "viewHome",
          align: "left",
          field: "_id",
          label: this.$i18n.t("homeGroup-tableHeader-viewHome")
        },
        {
          name: "name",
          style: "max-width:15rem; overflow: hidden; text-overflow:ellipsis;",
          align: "left",
          field: "name",
          label: this.$i18n.t("homeGroup-tableHeader-name")
        },
        {
          name: "activityLevel",
          align: "left",
          style: "max-width:100rem;",
          field: "activityLevel",
          label: this.$i18n.t("homeGroup-tableHeader-activityLevels")
        },
        {
          name: "viewReport",
          align: "left",
          field: "_id",
          label: this.$i18n.t("homeGroup-tableHeader-viewReport")
        }
      ]
    };
  },

  async mounted() {
    await this.init();
  },

  methods: {
    async close(results) {
      this.showAddHome = false;
      if (results) {
        await this.init();
      }
    },
    closeManager() {
      this.showAssignManager = false;
    },
    async init() {
      this.homes = await getHomesWithActivityLevel(this.group._id);
      await this.$nextTick();
      this.homes.forEach(home => renderChart(home._id, home.activityLevel));
    }
  }
};
</script>
<style lang="scss" scoped>
.legend-inactive {
  color: $inactive;
}

.legend-semiactive {
  color: $semiactive;
}
.legend-active {
  color: $active;
}

.name-width {
  max-width: 30ch;
  text-overflow: ellipsis;
  white-space: pre-wrap;
}

.chart-width {
  width: 400rem;
}
</style>
