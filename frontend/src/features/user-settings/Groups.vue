.<template>
  <q-dialog @hide="closeDialog" @escape-key="closeDialog" v-model="openDialog">
    <q-card class="q-pa-md">
      <q-card-section class="text-h6" horizontal>
        <q-icon name="fa fa-user" />&nbsp;
        {{ $i18n.t("editUserGroups-header") }}
      </q-card-section>
      <q-card-section class="q-mt-lg" horizontal>
        <q-form class="q-mt-lg" ref="myForm">
          <q-select
            v-model="group"
            option-value="_id"
            option-label="name"
            multiple
            emit-value
            map-options
            :label="$i18n.t('editUserGroups-groupsLabel')"
            use-chips
            :options="groups"
          />
          <div class="q-mt-md">
            <q-btn @click="validateAndSubmit" class="bg-positive text-white">
              {{ $i18n.t("editUserGroups-saveButton") }}
            </q-btn>
            <q-btn @click="closeDialog" class="q-ml-md bg-negative text-white">
              {{ $i18n.t("editUserGroups-cancelButton") }}
            </q-btn>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import { requiredValidation } from "src/utils/validations.js";
import {
  getSingleUserGroupIdsApi,
  addSingleUserPermissionsApi,
} from "./services/index";
import { getUserGroups } from "src/features/homes/services/homes-list.js";

export default {
  props: {
    userId: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      group: [],
      openDialog: true,
      requiredValidation,
      groups: null,
    };
  },

  created() {
    this.init();
  },

  methods: {
    async init() {
      this.groups = await getUserGroups();
      this.group = await getSingleUserGroupIdsApi(this.userId, this.groups);
    },

    async validateAndSubmit() {
      if (await addSingleUserPermissionsApi(this.userId, this.group)) {
        this.$emit("close", true);
      }
    },
    closeDialog() {
      this.$emit("close");
    },
  },
};
</script>