<template>
  <v-container fluid>
    <v-row justify="left">
      <v-btn color="primary" dark class="mr-2" @click.stop="createLicense()">
        Crear Licencia
      </v-btn>

      <v-btn color="primary" dark class="mr-2" @click.stop="setACL()">
        Registrar usuario
      </v-btn>

      <v-dialog v-model="certDialog" max-width="690">
        <v-card>
          <v-card-title class="headline">Registrar usuario</v-card-title>

          <v-card-text>
            <v-col class="d-flex" cols="12" sm="6">
              <v-select
                v-model="role"
                item-text="label"
                item-value="value"
                single-line
                :items="roles"
                label="Rol"
              />
            </v-col>

            <v-text-field v-model="address" label="Direccion"></v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="setACL()">
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="licenseDialog" max-width="690">
        <v-card>
          <v-card-title class="headline">Crear licencia</v-card-title>

          <v-card-text>
            <v-col cols="12" sm="6" md="4">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="expires"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="expires"
                    label="Fecha Expiracion"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="expires" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false"
                    >Cancelar</v-btn
                  >
                  <v-btn text color="primary" @click="$refs.menu.save(expires)"
                    >OK</v-btn
                  >
                </v-date-picker>
              </v-menu>
            </v-col>

            <v-text-field v-model="license" label="License"></v-text-field>
            <v-text-field
              v-model="description"
              label="Description"
            ></v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="createLicense()">
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row justify="left">
      <div>{{ message }}</div>
    </v-row>
  </v-container>
</template>
1
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import { setupSolido } from "../setupSolido";
import { ethers } from "ethers";
import EthCrypto from "eth-crypto";
import * as moment from "moment";
import * as ipfs from "ipfs-http-client";
import { EventFilter } from "@decent-bet/solido";
import { filter } from "rxjs/operators";
import { forkJoin } from "rxjs";
import {
  SolidoSingleton
} from "../../components/core/SolidoSingleton";
import { MiddlewareOptions } from "../../../../libs";

@Component({
  name: "Management"
})
export default class Management extends Vue {
  contracts: any;
  items: any = [];
  dialog: any = false;
  headers: any = [];
  loading: boolean = false;
  address = "";

  message = "";
  menu = false;
  license = "";
  description = "";
  expires: any = new Date().toISOString().substr(0, 10);

  certDialog: any = false;
  licenseDialog: any = false;
  role = "";
  roles = [
    {
      label: "Notario",
      value: 1
    },
    {
      label: "Usuario",
      value: 2
    }
  ];

  async mounted() {
    const solidoProps: MiddlewareOptions = await SolidoSingleton.getProps();

    const contracts = solidoProps.ethereum.contracts;

    this.contracts = contracts;

    // const invoices = this.contracts.Documents;
  }

  async createLicense() {
    try {
      if (this.licenseDialog) {
        this.licenseDialog = false;
        this.loading = true;
        const license = ethers.utils.toUtf8Bytes(this.license);
        const description = this.description;
        // @ts-ignore
        const expires = moment(this.expires, "YYYY-MM-DD").unix();
        const { Documents } = this.contracts;

        const res = await Documents.instance.functions.createLicense(
          ethers.utils.sha256(license),
          expires,
          description,
          {
            gasPrice: 20000000000
          }
        );
      } else {
        this.licenseDialog = true;
      }
    } catch (e) {
      alert("Direccion ya asignada o no gas insuficiente");
    }
  }

  async setACL() {
    try {
      if (this.certDialog) {
        this.certDialog = false;
        this.loading = true;
        const address = this.address;
        const { Documents } = this.contracts;

        if (this.role.toString() === "1") {
          const res = await Documents.instance.functions.addACL(
            this.address,
            this.role,
            {
              gasPrice: 20000000000
            }
          );
        }
      } else {
        this.certDialog = true;
      }
    } catch (e) {
      alert("Direccion ya asignada o no gas insuficiente");
    }
  }
}

// handle.sed'
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
