import React from "react";
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Switch from "@mui/material/Switch";
import styles from "../styles/TaskListContainer.module.css";


type Props = {
    filter: {
    priority?: string;
    dueDate?: "past" | "today" | "upcoming";
    };
    setFilter: React.Dispatch<React.SetStateAction<{
    priority?: string;
    dueDate?: "past" | "today" | "upcoming";
    }>>;
    sortKey: "createdAt" | "dueDate";
    setSortKey: React.Dispatch<React.SetStateAction<"createdAt" | "dueDate">>;
    sortOrder: "asc" | "desc";
    setSortOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
    handleToggleSort: () => void;
    showCompleted: boolean;
    setShowCompleted: React.Dispatch<React.SetStateAction<boolean>>;
};

export function TaskFilter({
    filter,
    setFilter,
    sortKey,
    setSortKey,
    sortOrder,
    handleToggleSort,
    showCompleted,
    setShowCompleted,
}: Props) {

    return (
    <div className={styles.FilterContainer}>
        <div className={styles.FilterItem}>
            <label>優先度:</label>
            <Select
                value={filter.priority || ""}
                onChange={(_, value) => setFilter({ ...filter, priority: value || undefined })}
                size="sm"
    >
                <Option value="">すべて</Option>
                <Option value="high">高</Option>
                <Option value="medium">中</Option>
                <Option value="low">低</Option>
            </Select>

            <label>期限日:</label>
            <Select
                value={filter.dueDate || ""}
                onChange={(_, value) => setFilter({ ...filter, dueDate: value as "past" | "today" | "upcoming" })}
                size="sm"
    >
                <Option value="">すべて</Option>
                <Option value="past">期限切れ</Option>
                <Option value="today">今日</Option>
                <Option value="upcoming">今後</Option>
            </Select>
            <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 2 }} />

            <label>ソート基準:</label>
            <Select
                value={sortKey}
                onChange={(_, value) => setSortKey(value as "createdAt" | "dueDate")}
                size="sm"
    >
                <Option value="createdAt">作成日</Option>
                <Option value="dueDate">期限日</Option>
            </Select>
            <Tooltip title={ sortOrder === "desc" ? "降順" : "昇順"}>
                <IconButton
                    aria-label="toggle sort"
                    size="large"
                    onClick={handleToggleSort}
                    sx={{
                    transition: "transform 0.3s ease",
                    transform: sortOrder === "desc" ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                >
                    <FilterListIcon />
                </IconButton>
            </Tooltip>
            <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 2 }} />

            <Tooltip  title={showCompleted ? "完了済みタスクを非表示" : "完了済みタスクを表示"} placement="top">
                <Switch
                    checked={showCompleted}
                    onChange={(e) => setShowCompleted(e.target.checked)}
                />
            </Tooltip>

        </div>
    </div>
    )
}
