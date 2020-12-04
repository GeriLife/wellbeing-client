<template>
  <div class="full-width">
    <q-card flat>
      <q-card-section>
        <div class="text-h5">
          <q-icon name="fa fa-users"></q-icon>&nbsp;
          <span>{{ $i18n.t("residents-header") }}</span>
          <span class="float-right">
            <q-btn
              @click="showAddEditForm = true"
              v-if="$store.getters['user/userManagesAGroup']"
              class="bg-primary text-white"
            >
              {{ $i18n.t("residents-header-addResidencyButton") }}
            </q-btn>
          </span>
        </div>
        <q-separator class="q-mt-sm" />
      </q-card-section>
    </q-card>

    <q-card class="q-mx-md" flat bordered>
      <q-card-section class="bg-grey-4">
        {{ $i18n.t("residents-filterPanel-header") }}
      </q-card-section>
      <q-card-section class="row q-gutter-xs justify-between">
        <q-input
          class="col-5"
          outlined
          v-model="name"
          :label="$i18n.t('residents-filterLabels-fullName')"
        />

        <q-input
          class="col-5"
          outlined
          v-model="home"
          :label="$i18n.t('residents-filterLabels-homeName')"
        />
        <div class="col">
          <q-checkbox
            v-model="includeDeparted"
            @input="getTableData"
            :label="$i18n.t('residents-filterPanel-includeDeparted')"
          />
        </div>
      </q-card-section>
    </q-card>
    <q-card flat>
      <q-card-section>
        <q-table
          :pagination.sync="pagination"
          class="q-mt-md"
          :data="tableData"
          :columns="headers"
          row-key="name"
          :loading="loading"
          :rows-per-page-options="[10, 25, 50, 100]"
        >
          <template v-slot:body-cell-homeId="props">
            <q-td :props="props">
              <q-btn
                @click="$router.push(`/resident/${props.row.residentId}`)"
                size="sm"
                class="text-black"
                outline
                icon="fa fa-user"
              />
            </q-td>
          </template>

          <template v-slot:body-cell-residentId="props">
            <q-td :props="props">
              <q-btn
                v-if="userManagesHome(props.row.homeId)"
                @click="
                  showAddEditForm = true;
                  selectedResidency = props.row;
                "
                size="sm"
                color="primary"
              >
                {{ $i18n.t("residentCurrentResidency-editResidencyButton") }}
              </q-btn>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
    <add-edit-residency-form
      v-if="showAddEditForm"
      :residency="selectedResidency"
      @close="
        () => {
          showAddEditForm = false;
          selectedResidency = null;
        }
      "
      @close-and-exit="
        () => {
          showAddEditForm = false;
          selectedResidency = null;
          getTableData();
        }
      "
    />
  </div>
</template>
<script>
import { getResidentsWithHomeAndResidentDetailsApi } from "./services/residency-services.js";
import AddEditResidencyForm from "./components/AddEditResidencyForm";

export default {
  components: {
    AddEditResidencyForm
  },

  data() {
    return {
      pagination: {},
      data: [],
      showAddEditForm: false,
      selectedResidency: null,
      loading: false,
      headers: [
        {
          name: "homeId",
          align: "left",
          field: "homeId",
          label: this.$i18n.t("residents-tableLabels-viewResident")
        },
        {
          name: "residentName",
          align: "left",
          field: "residentName",
          sortable: true,
          label: this.$i18n.t("residents-tableLabels-fullName")
        },
        {
          name: "homeName",
          align: "left",
          field: "homeName",
          sortable: true,
          label: this.$i18n.t("residents-tableLabels-homeName")
        },
        {
          name: "residentId",
          align: "left",
          field: "residentId",
          label: this.$i18n.t("residents-tableLabels-residency")
        }
      ],
      includeDeparted: false,
      name: "",
      home: ""
    };
  },

  computed: {
    tableData() {
      return this.data.filter(
        row =>
          (!this.home && !this.name) ||
          (!!this.home &&
            row.homeName.toLowerCase().indexOf(this.home.toLowerCase()) > -1) ||
          (!!this.name &&
            row.residentName.toLowerCase().indexOf(this.name.toLowerCase()) >
              -1)
      );
    }
  },

  created() {
    this.getTableData();
  },

  methods: {
    async getTableData() {
      this.loading = true;
      this.data = await getResidentsWithHomeAndResidentDetailsApi(
        this.includeDeparted
      );
      this.loading = false;
    },

    userManagesHome(homeId) {
      return this.$store.getters["user/userManagesHome"](homeId);
    }
  }
};
</script>
