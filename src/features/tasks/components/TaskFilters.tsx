import React from "react";
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import Divider from '@mui/material/Divider';
import styles from "../styles/TaskListContainer.module.css";


type Props = {
  filter: {
    priority?: string;
    status?: string;
    dueDate?: "past" | "today" | "upcoming";
  };
  setFilter: React.Dispatch<React.SetStateAction<{
    priority?: string;
    status?: string;
    dueDate?: "past" | "today" | "upcoming";
  }>>;
  sortKey: "createdAt" | "dueDate";
  setSortKey: React.Dispatch<React.SetStateAction<"createdAt" | "dueDate">>;
  sortOrder: "asc" | "desc";
  setSortOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
  handleToggleSort: () => void;
};

export function TaskFilter({
    filter,
    setFilter,
    sortKey,
    setSortKey,
    sortOrder,
    handleToggleSort,
}: Props) {

    return (
    <div className={styles.FilterContainer}>
        <div className={styles.FilterItem}>
            <div>
            <label>ステータス:　</label>
            <select
                value={filter.status || ""}
                onChange={e => setFilter({ ...filter, status: e.target.value as any })}
            >
                <option value="">すべて</option>
                <option value="未完了">未完了</option>
                <option value="完了">完了</option>
            </select>
            </div>

            <div>
            <label>優先度:　</label>
            <select
                value={filter.priority || ""}
                onChange={e => setFilter({ ...filter, priority: e.target.value })}
            >
                <option value="">すべて</option>
                <option value="high">高</option>
                <option value="medium">中</option>
                <option value="low">低</option>
            </select>
            </div>

            <div>
            <label>期限日:　</label>
            <select
                value={filter.dueDate || ""}
                onChange={e => setFilter({ ...filter, dueDate: e.target.value as "past" | "today" | "upcoming" })}
                >
                <option value="">すべて</option>
                <option value="past">期限切れ</option>
                <option value="today">今日</option>
                <option value="upcoming">今後</option>
            </select>
            </div>
            <Divider orientation="vertical" variant="middle" flexItem />
            <div>
            <label>ソート基準:　</label>
                <select
                    value={sortKey}
                    onChange={e => setSortKey(e.target.value as "createdAt" | "dueDate")}
                >
                    <option value="createdAt">作成日</option>
                    <option value="dueDate">期限日</option>
                </select>

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
            </div>
        </div>
    </div>
    )
}
