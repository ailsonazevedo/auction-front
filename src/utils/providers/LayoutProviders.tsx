import { SocketProvider } from "@/utils/providers/SocketProvider";
import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "react-hot-toast";

import AbilityProvider from "./AbilityProvider";
import { ReactqueryProvider } from "./ReactqueryProvider";
import { SidebarStoreProvider } from "./SidebarStoreProvider";
import ClientThemeProvider from "./ThemeProvider";

const TOAST_CONTAINER_STYLE = {
  bottom: 60,
  error: {
    border: "1px solid #ff4b4b",
  },
  loading: {
    border: "1px solid #616161",
  },
  right: 30,
  success: {
    border: "1px solid #61d345",
  },
};

const LayoutProviders = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <AppRouterCacheProvider>
      <ReactqueryProvider>
        <AbilityProvider>
          <SidebarStoreProvider>
            <SocketProvider>
              <ClientThemeProvider>
                <Toaster
                  containerStyle={TOAST_CONTAINER_STYLE}
                  position="top-right"
                  reverseOrder={true}
                  toastOptions={{
                    error: {
                      style: {
                        border: TOAST_CONTAINER_STYLE.error.border,
                      },
                    },
                    loading: {
                      style: {
                        border: TOAST_CONTAINER_STYLE.loading.border,
                      },
                    },
                    success: {
                      style: {
                        border: TOAST_CONTAINER_STYLE.success.border,
                      },
                    },
                  }}
                />

                <NuqsAdapter>
                  <NuqsAdapter>{children}</NuqsAdapter>
                </NuqsAdapter>
                <CssBaseline />
              </ClientThemeProvider>
            </SocketProvider>
          </SidebarStoreProvider>
        </AbilityProvider>
      </ReactqueryProvider>
    </AppRouterCacheProvider>
  );
};

export { LayoutProviders };
