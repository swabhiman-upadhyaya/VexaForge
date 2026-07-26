import { k8sNetworkingV1Api } from "./config.js";

export const createIngress = async (sandboxId) => {
  const ingressManifest = {
    metadata: {
      name: `sandbox-ingress-${sandboxId}`,
      labels: {
        app: "sandbox",
        sandboxId: sandboxId,
      },
    },
    spec: {
      ingressClassName: "nginx",
      rules: [
        {
          host: `${sandboxId}.preview.localhost`,
          http: {
            paths: [
              {
                pathType: "Prefix",
                path: "/",
                backend: {
                  service: {
                    name: `sandbox-service-${sandboxId}`,
                    port: {
                      number: 80,
                    },
                  },
                },
              },
            ],
          },
        },
      ],
    },
  };

  const response = await k8sNetworkingV1Api.createNamespacedIngress({
    namespace: "default",
    body: ingressManifest,
  });

  return response;
};
