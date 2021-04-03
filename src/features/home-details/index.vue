<template>
  <q-card flat class="fit">
    <q-card-section>
      <div class="text-h5">
        <q-icon name="fa fa-lg fa-home"></q-icon>&nbsp;
        {{ home.name }}

        <q-btn
          v-if="userIsAdmin"
          @click="showAddHome = true"
          size="sm"
          outline
          class="text-black bg-white"
        >
          {{ $i18n.t("home-editHomeButton") }}
        </q-btn>
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div class="row justify-between">
        <div class="col-md-6 q-pr-xs col-12">
          <residents-last-week v-if="home._id" :home-id="home._id" />
        </div>
        <div class="col-md-6 q-pr-xs col-12">
          <activity-level-trends-panel v-if="home._id" :home-id="home._id" />
        </div>
      </div>
      <div class="q-mt-md row">
        <q-card class="col-12" flat bordered>
          <q-card-section class="bg-grey-4">
            <q-icon name="fa fa-lg fa-heartbeat"></q-icon>&nbsp;
            {{ $i18n.t("activities-pageHeader") }}
          </q-card-section>
          <q-card-section>
            <q-tabs
              v-model="tab"
              align="left"
              dense
              class="bg-grey-3"
              narrow-indicator
            >
              <q-tab
                :label="$i18n.t('home-activitiesPanel-activitySummaryTab')"
                name="summary"
              />

              <q-tab
                :label="$i18n.t('home-activitiesPanel-activityTableTab')"
                name="table"
              />
            </q-tabs>
            <div class="q-mx-md">
              <activity-summary
                v-if="home._id && tab === 'summary'"
                :home-id="home._id"
              />
              <activity-table
                v-if="home._id && tab === 'table'"
                :home-id="home._id"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </q-card-section>
    <add-home
      v-if="showAddHome"
      :home="home"
      :group-id="home.groupId"
      @close="close"
    />
  </q-card>
</template>
<script>
import { getHomeDetailsApi } from "src/services/homes.js";
import AddHome from "../homes/add-home";
import ActivityLevelTrendsPanel from "./components/activity-level-trends-panel";
import ResidentsLastWeek from "./components/residents-last-week";
import ActivitySummary from "./components/activity-summary";
import ActivityTable from "./components/activity-table";

export default {
  components: {
    AddHome,
    ActivityLevelTrendsPanel,
    ResidentsLastWeek,
    ActivitySummary,
    ActivityTable,
  },
  data() {
    return {
      home: {},
      showAddHome: false,
      tab: "summary",
    };
  },
  computed: {
    userIsAdmin() {
      return this.$store.getters["user/isUserAdmin"];
    },
  },
  async created() {
    this.home = await getHomeDetailsApi(this.$route.params.id);
  },
  methods: {
    async close() {
      this.showAddHome = false;
      this.home = await getHomeDetailsApi(this.$route.params.id);
    },
  },
};
</script>
