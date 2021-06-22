<template>
  <div class="lessons-container">
    <div class="lessons-header">
      <div>
        <el-radio-group v-model="listQuery.filter.status">
          <el-radio-button label="Tất cả">Tất cả</el-radio-button>
          <el-radio-button label="Đang mở">Đang mở</el-radio-button>
          <el-radio-button label="Đã đóng">Đã đóng</el-radio-button>
        </el-radio-group>
      </div>
      <div>
        <el-button @click="$router.push({ path: '/courses/create' })"
          >Tạo khoá học mới</el-button
        >
      </div>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      fit
      highlight-current-row
      :show-header="false"
    >
      <el-table-column align="center" width="95">
        <template slot-scope="scope">
          <div class="block">
            <el-avatar :size="50" :src="scope.row.courseImageUrl"></el-avatar>
          </div>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <div>
            <b>
              {{ scope.row.name }}
            </b>
          </div>
          <div style="font-size: 12px">
            {{ scope.row.authors }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="110" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ (scope.row.duration / 60).toFixed() }} phút</span>
        </template>
      </el-table-column>
      <el-table-column width="90" align="center">
        <template slot-scope="scope">
          <i class="el-icon-user-solid"></i>
          {{ scope.row.teachers }}
        </template>
      </el-table-column>
      <el-table-column width="80" align="center">
        <template slot-scope="scope">
          <i class="el-icon-user-solid"></i>
          {{ scope.row.members }}
        </template>
      </el-table-column>
      <el-table-column align="center" width="80">
        <template slot-scope="scope">
          <i class="el-icon-notebook-2" />
          <span>{{ scope.row.lessons }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="80">
        <template slot-scope="scope">
          <i class="el-icon-s-data" style="transform: rotate(90deg)" />
          <span>{{ scope.row.quizzes }}</span>
        </template> </el-table-column
      ><el-table-column align="center" width="90">
        <template slot-scope="scope">
          {{ scope.row.progress || 0 }} %
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" width="110" align="center">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" disabled> </el-switch>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button @click="handleEditCourse(scope.row.id)">Cài đặt</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { CourseModule } from '@/store/modules/course'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'Courses'
})
export default class extends Vue {
  private list = []
  private listLoading = true
  private listQuery = {
    page: 1,
    limit: 20,
    filter: {
      status: 'all'
    }
  }

  created() {
    this.getList()
  }

  private async getList() {
    this.listLoading = true
    try {
      const courses = await CourseModule.getCourse()
      this.list = courses.data.map((course: any) => ({
        ...course,
        status: course.status === 'ENABLE'
      }))
      this.listLoading = false
    } catch (error) {
      console.warn(error)
    }
  }

  private handleEditCourse(courseId: string) {
    console.log(123333, courseId, 1233)
    this.$router.push({ path: `edit/${courseId}` })
  }
}
</script>

<style lang="scss">
.lessons {
  &-container {
    margin: 30px;
  }

  &-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;

    .el-radio-button__inner {
      border: unset !important;
    }

    .el-radio-button__orig-radio:checked + .el-radio-button__inner {
      color: black;
      font-weight: bold;
      background-color: white;
      box-shadow: unset;
    }
  }
}
</style>
