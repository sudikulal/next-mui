import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import FilterListAltIcon from '@mui/icons-material/FilterListAlt';

import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import SchoolIcon from "@mui/icons-material/School";
import SupportIcon from "@mui/icons-material/Support";
import WorkIcon from "@mui/icons-material/Work";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";

const filterItems = [
  { label: "Home", path: "/", icon: <HomeFilledIcon /> },
  { label: "Learn", path: "/Learn", icon: <SchoolIcon /> },
  { label: "Helper", path: "/Helper", icon: <SupportIcon /> },
  { label: "Work", path: "/Work", icon: <WorkIcon /> },
  { label: "Job", path: "/Job", icon: <ModelTrainingIcon /> },
];

export default function FilterDropdown() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedName, setSelectedName] = React.useState<string | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (name: string) => {
    setSelectedName(name);
    handleClose();
  };

  React.useEffect(() => {
    const handleScroll = () => {
      if (anchorEl) handleClose();
    };

    if (anchorEl) {
      window.addEventListener('scroll', handleScroll, true);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [anchorEl]);

  return (
    <div>
      <IconButton onClick={handleClick}>
        <FilterListAltIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              width: 200,
            },
          },
        }}
      >
        {filterItems.map((item) => (
          <MenuItem
            key={item.label}
            onClick={() => handleSelect(item.label)}
            selected={selectedName === item.label}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
