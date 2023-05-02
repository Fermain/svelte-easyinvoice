<script lang="ts">
	import type { InvoiceSenderOrClient } from "easyinvoice";

  const company: InvoiceSenderOrClient = {
    address: "Sample Street 123",
    city: "Sample City",
    company: "Sample Corp",
    country: "Samplian Republic",
    zip: "SMP123"
  }

  async function createSampleCompany() {
    const response = await fetch("/company/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(company)
    });
    const data = await response.json();
    console.log(data);
  }
</script>

<button class="btn btn-primary" on:click={createSampleCompany}>Test</button>