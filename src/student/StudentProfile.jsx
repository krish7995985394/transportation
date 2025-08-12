import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase'; // ✅ correct import
import { doc, getDoc } from 'firebase/firestore';


function StudentProfile() {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const docRef = doc(db, 'students', user.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setStudentData(docSnap.data());
        } else {
          console.log("No student data found");
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  if (loading) return <p>Loading profile...</p>;

  if (!studentData) return <p>No profile data available.</p>;

  return (
    <div>
      <h2>Student Profile</h2>
      <p><strong>Name:</strong> {studentData.name}</p>
      <p><strong>Email:</strong> {studentData.email}</p>
      <p><strong>Roll No:</strong> {studentData['roll no']}</p>
      <p><strong>Branch:</strong> {studentData.branch}</p>
      <p><strong>Semester:</strong> {studentData.semester}</p>
      <p><strong>Gender:</strong> {studentData.gender}</p>
      <p><strong>DOB:</strong> {studentData.dob?.toDate().toLocaleDateString() || 'N/A'}</p>
    </div>
  );
}

export default StudentProfile;
