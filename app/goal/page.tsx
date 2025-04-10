'use client';

import React, { useState, useEffect } from 'react';
import './index.css';

interface Goal {
  id: number;
  title: string;
  description: string;
  targetDate: string;
  createdDate: string;
  progress: number;
  targetAmount: number; 
  currentAmount: number; 
  imageUrl: string;
}

const GoalPage = () => {
  const [goals, setGoals] = useState<Goal[]>(() => {
    // Try to get goals from localStorage on initial load
    if (typeof window !== 'undefined') {
      const savedGoals = localStorage.getItem('goals');
      if (savedGoals) {
        return JSON.parse(savedGoals);
      }
    }
    // Default goals if no saved goals exist
    return [
    {
      id: 1,
      title: 'Membeli Mobil Impian',
      description: 'Mengumpulkan dana untuk membeli mobil Toyota Innova dengan DP 30% dan cicilan 3 tahun',
      targetDate: '2025-06-30',
        createdDate: new Date().toISOString().split('T')[0],
      progress: 45,
      targetAmount: 150000000,
      currentAmount: 67500000,
        imageUrl: '/path/to/toyota-innova.jpg',
      },
      {
        id: 2,
        title: 'Liburan ke Bali',
        description: 'Mengumpulkan dana untuk liburan ke Bali selama 5 hari',
        targetDate: '2024-12-31',
        createdDate: new Date().toISOString().split('T')[0],
        progress: 30,
        targetAmount: 25000000,
        currentAmount: 7500000,
        imageUrl: '/path/to/bali.jpg',
      },
      {
        id: 3,
        title: 'DP Rumah',
        description: 'Mengumpulkan dana untuk DP rumah dengan target 20% dari harga rumah',
        targetDate: '2026-12-31',
        createdDate: new Date().toISOString().split('T')[0],
        progress: 15,
        targetAmount: 500000000,
        currentAmount: 75000000,
        imageUrl: '/path/to/rumah.jpg',
      }
    ];
  });

  // Save goals to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    targetDate: '',
    progress: 0,
    targetAmount: 0,
    currentAmount: 0,
    imageUrl: '',
  });

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.description && newGoal.targetDate) {
      const goal: Goal = {
        id: goals.length + 1,
        ...newGoal,
        createdDate: new Date().toISOString().split('T')[0],
      };
      setGoals([...goals, goal]);
      setNewGoal({
        title: '',
        description: '',
        targetDate: '',
        progress: 0,
        targetAmount: 0,
        currentAmount: 0,
        imageUrl: '',
      });
      setShowForm(false);
    }
  };

  const handleDeleteGoal = (id: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus tujuan ini?')) {
    setGoals(goals.filter((goal) => goal.id !== id));
    }
  };

  const handleUpdateProgress = (id: number, newProgress: number) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id ? { ...goal, progress: newProgress } : goal
      )
    );
  };

  const handleEditGoal = (goal: Goal) => {
    setEditingGoal(goal);
    setNewGoal({
      title: goal.title,
      description: goal.description,
      targetDate: goal.targetDate,
      progress: goal.progress,
      targetAmount: goal.targetAmount,
      currentAmount: goal.currentAmount,
      imageUrl: goal.imageUrl,
    });
    setShowForm(true);
  };

  const handleUpdateGoal = () => {
    if (editingGoal && newGoal.title && newGoal.description && newGoal.targetDate) {
      setGoals(
        goals.map((goal) =>
          goal.id === editingGoal.id
            ? {
                ...goal,
                title: newGoal.title,
                description: newGoal.description,
                targetDate: newGoal.targetDate,
                progress: newGoal.progress,
                targetAmount: newGoal.targetAmount,
                currentAmount: newGoal.currentAmount,
                createdDate: goal.createdDate,
              }
            : goal
        )
      );
      setEditingGoal(null);
      setNewGoal({
        title: '',
        description: '',
        targetDate: '',
        progress: 0,
        targetAmount: 0,
        currentAmount: 0,
        imageUrl: '',
      });
      setShowForm(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingGoal(null);
    setNewGoal({
      title: '',
      description: '',
      targetDate: '',
      progress: 0,
      targetAmount: 0,
      currentAmount: 0,
      imageUrl: '',
    });
    setShowForm(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewGoal({ ...newGoal, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="goal-container">
      <div className="flex justify-between items-center mb-12">
        <div>
        <h2 className="analisis-title">
Tujuan Keuangan
          </h2>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="goal-button goal-button-primary"
          >
            + Tujuan
          </button>
        )}
      </div>

      {showForm && (
        <div className="goal-form">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingGoal ? 'Edit Tujuan' : 'Tambah Tujuan Baru'}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Judul
              </label>
              <input
                type="text"
                value={newGoal.title}
                onChange={(e) =>
                  setNewGoal({ ...newGoal, title: e.target.value })
                }
                className="goal-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Deskripsi
              </label>
              <textarea
                value={newGoal.description}
                onChange={(e) =>
                  setNewGoal({ ...newGoal, description: e.target.value })
                }
                className="goal-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tanggal Target
              </label>
              <input
                type="date"
                value={newGoal.targetDate}
                onChange={(e) =>
                  setNewGoal({ ...newGoal, targetDate: e.target.value })
                }
                className="goal-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Target Uang
              </label>
              <input
                type="number"
                value={newGoal.targetAmount}
                onChange={(e) =>
                  setNewGoal({ ...newGoal, targetAmount: Number(e.target.value) })
                }
                className="goal-input"
                placeholder="Masukkan jumlah target"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Uang Saat Ini
              </label>
              <input
                type="number"
                value={newGoal.currentAmount}
                onChange={(e) =>
                  setNewGoal({ ...newGoal, currentAmount: Number(e.target.value) })
                }
                className="goal-input"
                placeholder="Masukkan jumlah saat ini"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gambar
              </label>
              <div className="mt-1 flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden mr-4">
                  {newGoal.imageUrl ? (
                    <img 
                      src={newGoal.imageUrl} 
                      alt="Preview" 
                      className="w-6 h-6 object-cover"
                    />
                  ) : (
                    <img 
                      src="/placeholder.jpg" 
                      alt="Placeholder" 
                      className="w-6 h-6 object-cover"
                    />
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-[#F0BB78] file:text-[#543A14]
                    hover:file:bg-[#543A14] hover:file:text-[#F0BB78]"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={editingGoal ? handleCancelEdit : () => setShowForm(false)}
                className="goal-button goal-button-secondary"
              >
                Batal
              </button>
              <button
                onClick={editingGoal ? handleUpdateGoal : handleAddGoal}
                className="goal-button goal-button-primary"
              >
                {editingGoal ? 'Simpan Perubahan' : 'Simpan'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="goal-grid">
        {goals.map((goal) => (
          <div 
            key={goal.id} 
            className={`goal-card ${goal.id === 1 ? 'highlighted-goal' : ''}`}
          >
            <div className="goal-actions">
              <button
                onClick={() => handleEditGoal(goal)}
                className="action-button edit"
                aria-label="Edit goal"
                title="Edit goal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                  <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                </svg>
              </button>
              <button
                onClick={() => handleDeleteGoal(goal.id)}
                className="action-button delete"
                aria-label="Delete goal"
                title="Delete goal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="flex items-center mb-4">
              <div className="goal-image-container mr-4">
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                  {goal.imageUrl ? (
                    <img 
                      src={goal.imageUrl} 
                      alt={goal.title} 
                      className="w-8 h-8 object-cover"
                    />
                  ) : (
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-gray-400" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                      />
                    </svg>
                  )}
                </div>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
              {goal.title}
                </h1>
                <div className="flex items-center text-sm text-gray-500">
                  <span>{goal.createdDate} - {goal.targetDate}</span>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="analisis-expense-category-bar-container relative w-full bg-gray-200 rounded-full h-8 overflow-hidden">
                <div 
                  className="analisis-expense-category-bar absolute top-0 left-0 h-full bg-gradient-to-r from-[#F0BB78] to-[#543A14] transition-all duration-500 ease-in-out z-10"
                  style={{ 
                    width: `${Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100))}%`,
                    boxShadow: '0 0 10px rgba(240, 187, 120, 0.5)'
                  }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-between px-3 z-20">
                  <span className="text-sm text-gray-600">Rp {new Intl.NumberFormat('id-ID').format(goal.currentAmount)}</span>
                  <span className="text-sm text-gray-600">{Math.round((goal.currentAmount / goal.targetAmount) * 100)}%</span>
                  <span className="text-sm text-gray-600">Rp {new Intl.NumberFormat('id-ID').format(goal.targetAmount)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalPage;