'use client'

import { NhostClient } from "@nhost/nhost-js";

const nhost = new NhostClient({
    subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN!,
    region: process.env.NEXT_PUBLIC_NHOST_REGION!
})

export default nhost;