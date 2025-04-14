'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LineController,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  ChartJS.register(LineElement, PointElement, LineController, CategoryScale, LinearScale, Tooltip, Legend);
  
import './index.css';

type Activity = {
  category: string;
  type: 'income' | 'expense';
  amount: number;
  createdAt: string; // ISO string
};

type Payment = {
  name: string;
  amount: number;
};

type ReportStats = {
  totalIncome: number;
  totalExpense: number;
  balance: number;
};

export default function Dashboard() {
  const router = useRouter();

  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [reportStats, setReportStats] = useState<ReportStats>({
    totalIncome: 1000000,
    totalExpense: 400000,
    balance: 600000,
  });
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<'year' | 'month' | 'week'>('month');

  const getFilteredChartData = () => {
    // Data simulasi - idealnya ini berasal dari backend
    const labels = filterType === 'year'
      ? ['2022', '2023', '2024']
      : filterType === 'month'
        ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
        : ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'];
  
    const incomeData = labels.map(() => Math.floor(Math.random() * 1000000));
    const expenseData = labels.map(() => Math.floor(Math.random() * 500000));
  
    return {
      labels,
      datasets: [
        {
          label: 'Pemasukan',
          data: incomeData,
          fill: false,
          borderColor: '#4CAF50',
          tension: 0.4,
        },
        {
          label: 'Pengeluaran',
          data: expenseData,
          fill: false,
          borderColor: '#F44336',
          tension: 0.4,
        },
      ],
    };
  };
  

  useEffect(() => {
    // Simulasi ambil data
    const mockActivities: Activity[] = [
      {
        category: 'Makan',
        type: 'expense',
        amount: 30000,
        createdAt: new Date().toISOString(),
      },
      {
        category: 'Gaji',
        type: 'income',
        amount: 500000,
        createdAt: new Date().toISOString(),
      },
      {
        category: 'Transportasi',
        type: 'expense',
        amount: 20000,
        createdAt: new Date().toISOString(),
      },
      {
        category: 'Bonus',
        type: 'income',
        amount: 150000,
        createdAt: new Date().toISOString(),
      },
    ];

    const mockPayments: Payment[] = [
      { name: 'Bayar Listrik', amount: 150000 },
      { name: 'Bayar Internet', amount: 100000 },
    ];

    // Simulasi delay loading
    setTimeout(() => {
      setRecentActivities(mockActivities); // <-- bisa juga set ke [] buat tes kosong
      setPayments(mockPayments);          // <-- atau [] buat cek "belum buat daftar pembayaran"
      setLoading(false);
    }, 1000);
  }, []);

  const navigateToEducation = () => router.push('/education');
  const navigateToAnalysis = () => router.push('/analisis');

  if (loading) {
    return (
      <div className="loading">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* ROW 1: Edukasi (60%) dan Tabungan (40%) */}
      <div className="dashboard-row row-top">
      <div className="card">
        <div className="card-content">
            <div className="card-text">
            <h2>Tips Edukasi Keuangan</h2>
            <button className="read-more" onClick={navigateToEducation}>Mulai</button>
            </div>
            <img className="card-image" src="/images/edu-icon.png" alt="Edukasi" />
        </div>
        </div>

        <div className="card">
        <div className="card-content">
            <div className="card-text">
            <h2>Sisa Tabungan</h2>
            <p style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '10px' }}>
                Rp.{reportStats.balance.toLocaleString('id-ID')}
            </p>
            </div>
            <img className="card-image" src="/images/savings-icon.png" alt="Tabungan" />
        </div>
        </div>
      </div>
  
      {/* ROW 2: Aktivitas (40%) dan Laporan (60%) */}
      <div className="dashboard-row row-bottom">
        <div className="card">
          <h2>Aktivitas Teratas</h2>
          {recentActivities.length === 0 ? (
            <p>Belum ada aktivitas</p>
          ) : (
            <ul className="activity-list">
              {recentActivities.map((activity, index) => (
                <li key={index} className={activity.type === 'income' ? 'income' : 'expense'}>
                  <div className="activity-header">
                    <span className="category">{activity.category}</span>
                    <span className="amount">
                      {activity.type === 'income' ? '+' : '-'}Rp.{activity.amount.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="created-at">
                    {new Date(activity.createdAt).toLocaleString('id-ID', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
  
<div className="card">
  <h2>Grafik Keuangan</h2>
  <select
    value={filterType}
    onChange={(e) => setFilterType(e.target.value as 'year' | 'month' | 'week')}
    style={{ marginBottom: '10px', padding: '5px' }}
  >
    <option value="week">Mingguan</option>
    <option value="month">Bulanan</option>
    <option value="year">Tahunan</option>
  </select>

  <Line
    data={getFilteredChartData()}
    options={{
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: function (ctx) {
              return `Rp.${ctx.raw.toLocaleString('id-ID')}`;
            },
          },
        },
      },
      scales: {
        y: {
          ticks: {
            callback: (value) => `Rp.${value.toLocaleString('id-ID')}`,
          },
        },
      },
    }}
  />
  <button className="read-more" onClick={navigateToAnalysis}>Lihat Detail</button>

</div>

      </div>
    </div>
  );
  }
