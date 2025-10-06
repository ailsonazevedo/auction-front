"use client";
import { useControlParamsUrl } from "@/hooks/@shared/useControlParamsUrl";
import { keyframes } from "@emotion/react";
import { Reply } from "@mui/icons-material";
import {
  StepConnector,
  StepIconProps,
  stepConnectorClasses,
  styled,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { motion } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useState } from "react";

interface StepProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  label: string;
}

interface Props {
  hideNextButtonOnStep?: number[];
  onFinishPushTo?: string;
  orientation?: "horizontal" | "vertical";
  steps: StepProps[];
}

const gradientFlow = keyframes`
  0% {
    background-position: 0 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
`;

export const ColoredConnector = styled(StepConnector)(({ theme }) => ({
  [`& .${stepConnectorClasses.line}`]: {
    backgroundColor: theme.palette.grey[300],
    border: 0,
    borderRadius: 2,
    height: 3,
  },

  // Quando ativo
  [`&.${stepConnectorClasses.active} .${stepConnectorClasses.line}`]: {
    animation: `${gradientFlow} 3s ease infinite`,
    backgroundImage: "linear-gradient(270deg, #FD5426, #ff8a65, #FD5426)",
    backgroundSize: "200% 200%",
  },

  // Ajuste para horizontal
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },

  // Quando completo
  [`&.${stepConnectorClasses.completed} .${stepConnectorClasses.line}`]: {
    animation: `${gradientFlow} 3s ease infinite`,
    backgroundImage: "linear-gradient(270deg, #FD5426, #ff8a65, #FD5426)",
    backgroundSize: "200% 200%",
  },
}));

export function CustomStepIcon(props: StepIconProps) {
  const { active, className, completed, icon } = props;

  return (
    <motion.div
      animate={{
        opacity: 1,
        scale: active ? 1.1 : 1,
      }}
      className={className}
      initial={{ opacity: 0.7, scale: 0.9 }}
      style={{
        alignItems: "center",
        background: active
          ? "linear-gradient(135deg, #FD5426 0%, #ff8a65 100%)"
          : completed
            ? "linear-gradient(135deg, #FD5426 0%, #ff8a65 100%)"
            : "#e0e0e0",
        borderRadius: "50%",
        boxShadow: active
          ? "0px 0px 12px rgba(253, 84, 38, 0.6)"
          : "0px 0px 4px rgba(0,0,0,0.1)",
        color: "#fff",
        display: "flex",
        fontWeight: "bold",
        height: 36,
        justifyContent: "center",
        width: 36,
      }}
      transition={{ duration: 0.3 }}
    >
      {icon}
    </motion.div>
  );
}

export function LinearStepper({
  hideNextButtonOnStep = [],
  onFinishPushTo,
  orientation = "vertical",
  steps,
}: Readonly<Props>) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const { setParam } = useControlParamsUrl(searchParams, replace, pathname);
  const stepActive = searchParams.get("step");
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(Number(stepActive) || 0);

  useEffect(() => {
    if (stepActive) setActiveStep(Number(stepActive));
  }, [stepActive]);

  useEffect(() => {
    setParam("step", String(activeStep));
  }, [activeStep]);

  const handleNextStep = () => setActiveStep((prev) => prev + 1);
  const handleBackStep = () => setActiveStep((prev) => prev - 1);

  const renderActions = (isLast: boolean, index?: number) => (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        justifyContent:
          orientation === "horizontal" ? "flex-end" : "flex-start",
        mt: 2,
      }}
    >
      {activeStep !== 0 && (
        <Button
          disabled={orientation === "vertical" ? index === 0 : activeStep === 0}
          onClick={handleBackStep}
          startIcon={<Reply />}
        >
          Voltar
        </Button>
      )}
      {/* Esconde o botão Próxima se o step atual estiver em hideNextButtonOnStep */}
      {!hideNextButtonOnStep.includes(activeStep) && (
        <Button
          onClick={() => {
            if (
              orientation === "vertical"
                ? index === steps.length - 1
                : activeStep === steps.length - 1
            ) {
              router.push(`${onFinishPushTo}`);
            } else {
              handleNextStep();
            }
          }}
          variant="contained"
        >
          {isLast ? "Finalizar" : "Próxima"}
        </Button>
      )}
    </Box>
  );

  return (
    <Box>
      <Stepper
        activeStep={activeStep}
        alternativeLabel={orientation === "horizontal"}
        connector={<ColoredConnector />}
        orientation={orientation}
      >
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel StepIconComponent={CustomStepIcon} icon={step.icon}>
              {step.label}
            </StepLabel>

            {orientation === "vertical" && (
              <StepContent>
                <Box>{step.children}</Box>
                {renderActions(index === steps.length - 1, index)}
              </StepContent>
            )}
          </Step>
        ))}
      </Stepper>

      {orientation === "horizontal" && (
        <Box sx={{ mt: 3 }}>
          {steps[activeStep]?.children}
          {renderActions(activeStep === steps.length - 1)}
        </Box>
      )}
    </Box>
  );
}
